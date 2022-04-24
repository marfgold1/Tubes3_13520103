package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/marfgold1/TubesStima3/src/backend/databases"
	"github.com/marfgold1/TubesStima3/src/backend/models"
	"gorm.io/gorm"
)

var (
	penyakitNotFound     map[string]string
	penyakitBadRequest   map[string]string
	penyakitDuplicate    map[string]string
	penyakitFolderParent string
)

func init() {
	penyakitNotFound = map[string]string{
		"message": "Penyakit tidak ditemukan",
	}
	penyakitBadRequest = map[string]string{
		"message": "Input salah atau tidak valid",
	}
	penyakitDuplicate = map[string]string{
		"message": "Penyakit sudah ada di database",
	}
	penyakitFolderParent = "penyakit"
}

func getAllPenyakit(c echo.Context) error {
	var p []models.DNAPenyakit
	res := databases.DB.Find(&p)
	if res.Error != nil {
		return res.Error
	}
	return c.JSON(http.StatusOK, p)
}

func getPenyakit(c echo.Context) error {
	p := models.DNAPenyakit{}

	res := databases.DB.First(&p, "penyakit = ?", c.Param("id"))
	if res.Error == gorm.ErrRecordNotFound {
		return c.JSON(http.StatusNotFound, penyakitNotFound)
	}

	return c.JSON(http.StatusOK, p)
}

func createPenyakit(c echo.Context) error {
	p := models.DNAPenyakit{}
	p.Penyakit = c.FormValue("penyakit")
	if p.Penyakit == "" {
		return c.JSON(http.StatusBadRequest, penyakitBadRequest)
	}

	if databases.DB.Take(&p, "penyakit = ?", p.Penyakit).Error != gorm.ErrRecordNotFound {
		return c.JSON(http.StatusBadRequest, penyakitDuplicate)
	}

	dna, err := c.FormFile("dna")
	if err != nil {
		return c.JSON(http.StatusBadRequest, penyakitBadRequest)
	}

	p.DNA, err = databases.AddDNAFile(penyakitFolderParent, dna)
	if err != nil {
		if p.DNA == "?" {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": err.Error()})
		}
		return err
	}

	res := databases.DB.Create(&p)
	if res.Error != nil {
		databases.DeleteDNAFile(penyakitFolderParent, p.DNA)
		return res.Error
	}

	return c.JSON(http.StatusOK, p)
}

func updatePenyakit(c echo.Context) error {
	p := models.DNAPenyakit{}

	res := databases.DB.First(&p, "penyakit = ?", c.Param("id"))
	if res.Error == gorm.ErrRecordNotFound {
		return c.JSON(http.StatusNotFound, penyakitNotFound)
	}

	p.Penyakit = c.FormValue("penyakit")
	if p.Penyakit == "" {
		return c.JSON(http.StatusBadRequest, penyakitBadRequest)
	}

	dna, err := c.FormFile("dna")
	if err != nil {
		return c.JSON(http.StatusBadRequest, penyakitBadRequest)
	}

	oldName := p.DNA

	p.DNA, err = databases.AddDNAFile(penyakitFolderParent, dna)
	if err != nil {
		return err
	}

	res = databases.DB.Save(&p)
	if res.Error != nil {
		databases.DeleteDNAFile(penyakitFolderParent, p.DNA)
		return res.Error
	}

	if err = databases.DeleteDNAFile(penyakitFolderParent, oldName); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, p)
}

func deletePenyakit(c echo.Context) error {
	p := models.DNAPenyakit{}

	res := databases.DB.First(&p, "penyakit = ?", c.Param("id"))
	if res.Error == gorm.ErrRecordNotFound {
		return c.JSON(http.StatusNotFound, penyakitNotFound)
	}

	filename := p.DNA

	res = databases.DB.Unscoped().Delete(&p)
	if res.Error != nil {
		return res.Error
	}

	if err := databases.DeleteDNAFile(penyakitFolderParent, filename); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, p)
}

func Penyakit(e *echo.Echo) {
	g := e.Group("/penyakit")

	g.GET("/", getAllPenyakit)
	g.GET("/:id", getPenyakit)
	g.POST("/", createPenyakit)
	g.PUT("/:id", updatePenyakit)
	g.DELETE("/:id", deletePenyakit)
}

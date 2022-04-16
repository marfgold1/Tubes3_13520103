package controllers

import (
	"bytes"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/marfgold1/TubesStima3/src/backend/databases"
	"github.com/marfgold1/TubesStima3/src/backend/models"
	algo "github.com/marfgold1/TubesStima3/src/library/algorithm"
	"github.com/marfgold1/TubesStima3/src/library/utils"
	"gorm.io/gorm"
)

var (
	checkNotFound   map[string]string
	checkBadRequest map[string]string
)

func init() {
	checkNotFound = map[string]string{
		"message": "Check not found",
	}
	checkBadRequest = map[string]string{
		"message": "Bad request",
	}
}

func getAllCheck(c echo.Context) error {
	var p []models.DNACheck
	res := databases.DB.Find(&p)
	if res.Error != nil {
		return res.Error
	}
	return c.JSON(http.StatusOK, p)
}

func getCheck(c echo.Context) error {
	p := models.DNACheck{}

	res := databases.DB.First(&p, c.Param("id"))
	if res.Error == gorm.ErrRecordNotFound {
		return c.JSON(http.StatusNotFound, checkNotFound)
	}

	return c.JSON(http.StatusOK, p)
}

func createCheck(c echo.Context) error {
	p := models.DNACheck{}
	p.Penyakit = c.FormValue("penyakit")
	p.Pengguna = c.FormValue("pengguna")
	if p.Penyakit == "" || p.Pengguna == "" {
		return c.JSON(http.StatusBadRequest, checkBadRequest)
	}

	peny := models.DNAPenyakit{}
	if databases.DB.Take(
		&peny,
		"penyakit = ?",
		p.Penyakit,
	).Error == gorm.ErrRecordNotFound {
		return c.JSON(http.StatusBadRequest, penyakitNotFound)
	}

	dna, err := c.FormFile("dna")
	if err != nil {
		return c.JSON(http.StatusBadRequest, checkBadRequest)
	}

	file, err := dna.Open()
	if err != nil {
		return err
	}
	defer file.Close()

	buf := bytes.NewBuffer(nil)
	if _, err = io.Copy(buf, file); err != nil {
		return err
	}

	dna_seq := buf.String()
	if !utils.CheckIsValidDNA(dna_seq) {
		return c.JSON(http.StatusBadRequest, checkBadRequest)
	}

	dna_peny, err := databases.GetDNAFile(penyakitFolderParent, peny.DNA)
	if err != nil {
		return err
	}
	p.Result = algo.BMMatch(dna_seq, dna_peny) != -1
	p.Match = 0

	res := databases.DB.Create(&p)
	if res.Error != nil {
		return res.Error
	}

	return c.JSON(http.StatusOK, p)
}

func updateCheck(c echo.Context) error {
	p := models.DNACheck{}

	res := databases.DB.First(&p, c.Param("id"))
	if res.Error == gorm.ErrRecordNotFound {
		return c.JSON(http.StatusNotFound, checkNotFound)
	}

	p.Penyakit = c.FormValue("penyakit")
	p.Pengguna = c.FormValue("pengguna")
	if p.Penyakit == "" || p.Pengguna == "" {
		return c.JSON(http.StatusBadRequest, checkBadRequest)
	}

	return c.JSON(http.StatusOK, p)
}

func deleteCheck(c echo.Context) error {
	p := models.DNACheck{}

	res := databases.DB.First(&p, c.Param("id"))
	if res.Error == gorm.ErrRecordNotFound {
		return c.JSON(http.StatusNotFound, checkNotFound)
	}

	res = databases.DB.Unscoped().Delete(&p)
	if res.Error != nil {
		return res.Error
	}

	return c.JSON(http.StatusOK, p)
}

func Check(e *echo.Echo) {
	g := e.Group("/check")

	g.GET("/", getAllCheck)
	g.GET("/:id", getCheck)
	g.POST("/", createCheck)
	g.PUT("/:id", updateCheck)
	g.DELETE("/:id", deleteCheck)
}

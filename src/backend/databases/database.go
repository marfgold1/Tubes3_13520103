package databases

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"time"

	"github.com/marfgold1/TubesStima3/src/library/utils"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
)

func init() {
	var err error
	DB, err = gorm.Open(mysql.Open("stima:fFDzwk4Z!FpU_QU@tcp(127.0.0.1)/tubes3stima?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	os.Mkdir("./files", 0666)
	os.Mkdir("./files/penyakit", 0666)
}

func AddDNAFile(parent string, dnaFile *multipart.FileHeader) (string, error) {
	src, err := dnaFile.Open()
	if err != nil {
		return "", err
	}

	filename := fmt.Sprintf("%d", time.Now().Unix()) + ".dna"
	dest, err := os.Create("./files/" + parent + "/" + filename)
	if err != nil {
		return "", err
	}

	if _, err = io.Copy(dest, src); err != nil {
		return "", err
	}
	src.Close()
	dest.Close()

	dna, err := GetDNAFile(parent, filename)
	if err != nil {
		return "", err
	}

	if !utils.CheckIsValidDNA(dna) {
		DeleteDNAFile(parent, filename)
		return "?", fmt.Errorf("invalid DNA")
	}

	return filename, nil
}

func GetDNAFile(parent, filename string) (string, error) {
	src, err := os.ReadFile("./files/" + parent + "/" + filename)
	if err != nil {
		return "", err
	}
	return string(src), nil
}

func DeleteDNAFile(parent, filename string) error {
	return os.Remove("./files/" + parent + "/" + filename)
}

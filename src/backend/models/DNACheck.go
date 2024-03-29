package models

import (
	"github.com/marfgold1/TubesStima3/src/backend/databases"
	"gorm.io/gorm"
)

type DNACheck struct {
	gorm.Model
	Pengguna string
	Penyakit string
	Result   bool
	Match    float64
}

func init() {
	databases.DB.AutoMigrate(&DNACheck{})
}

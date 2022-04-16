package models

import (
	"time"

	"github.com/marfgold1/TubesStima3/src/backend/databases"
	"gorm.io/gorm"
)

type DNAPenyakit struct {
	Penyakit  string `gorm:"primaryKey"`
	DNA       string
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

func init() {
	databases.DB.AutoMigrate(&DNAPenyakit{})
}

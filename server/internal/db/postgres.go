package db

import (
	"fmt"
	"log"

	"github.com/bhumika019579/prooffolio/server/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(cfg *config.Config)*gorm.DB{
	dsn:=fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName,
	)
	database,err:=gorm.Open(postgres.Open(dsn),&gorm.Config{})
	if err!=nil{
		log.Fatal("failed to connect db:",err)
	}
	log.Println("database connected successfully")
	return database
}
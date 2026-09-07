package db

import (
	"fmt"
	"log"

	"github.com/bhumika019579/prooffolio/server/internal/config"
	"github.com/bhumika019579/prooffolio/server/internal/models"
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
	err=database.AutoMigrate(
		&models.User{},
		&models.Repo{},
		&models.Post{},
		&models.Tag{},
		&models.RepoTag{},
		&models.Like{},
		&models.Comment{},
	)
	if err!=nil{
		log.Fatal("failed to migrate database :",err)
	}
	log.Println("database migrated successfully")
	sqlDB, err := database.DB()
if err != nil {
	log.Fatal("failed to get sql db:", err)
}

var dbName string
var schema string

sqlDB.QueryRow("SELECT current_database()").Scan(&dbName)
sqlDB.QueryRow("SELECT current_schema()").Scan(&schema)

fmt.Println("GO DATABASE:", dbName)
fmt.Println("GO SCHEMA:", schema)
	return database
}
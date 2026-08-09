package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err!=nil{
		log.Println("no .env file found")
	}
	return &Config{
		Port:os.Getenv("PORT"),
	}
}
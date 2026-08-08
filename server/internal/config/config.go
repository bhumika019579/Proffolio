package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type config struct {
	port string
}

func LoadConfig() *config {
	err := godotenv.Load()
	if err!=nil{
		log.Println("no .env file found")
	}
	return &config{
		port:os.Getenv("PORT"),
	}
}
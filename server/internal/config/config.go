package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port string
	DBHost string
	DBPort string
	DBUser string
	DBPassword string
	DBName string 
	GithubClientID      string
	GithubClientSecret  string
	GithubRedirectURL   string
	JWTSecret  string 
	GroqAPIKey string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err!=nil{
		log.Println("no .env file found")
	}
	return &Config{
		Port:os.Getenv("PORT"),
		DBHost: os.Getenv("DB_HOST"),
		DBPort: os.Getenv("DB_PORT"),
		DBUser: os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBName: os.Getenv("DB_NAME"),
		GithubClientID: os.Getenv("GITHUB_CLIENT_ID"),
		GithubClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		GithubRedirectURL: os.Getenv("GITHUB_REDIRECT_URL"),
		JWTSecret: os.Getenv("JWT_SECRET"),
		GroqAPIKey: os.Getenv("GROQ_API_KEY"),
	}
}
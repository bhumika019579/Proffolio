package main

import (
	"net/http"

	"github.com/bhumika019579/prooffolio/server/internal/config"
	"github.com/bhumika019579/prooffolio/server/internal/db"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg:=config.LoadConfig()
	database:=db.Connect(cfg)
	_=database
	r := gin.Default()
	r.GET("/health",func(c*gin.Context){
		c.JSON(http.StatusOK,gin.H{
			"status":"ok",
		})
	})
	r.Run(":"+cfg.Port)
}
package routes

import (
	"github.com/bhumika019579/prooffolio/server/internal/config"
	"github.com/bhumika019579/prooffolio/server/internal/handlers"
	"github.com/bhumika019579/prooffolio/server/internal/middleware"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetUpRoutes(r *gin.Engine, cfg *config.Config, db *gorm.DB){
	r.GET("/auth/github",handlers.GithubLogin(cfg))
	r.GET("/auth/github/callback",handlers.GithubCallback(cfg,db))
	api:=r.Group("/api")
	api.Use(middleware.AuthMiddleware(cfg.JWTSecret))
	{
		
	}
}
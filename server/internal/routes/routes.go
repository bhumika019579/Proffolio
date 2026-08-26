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
	r.GET("/users/:username/profile",handlers.GetUserProfile(db))
	r.GET("/posts/:postId/comments", handlers.GetComments(db))
	r.GET("/feed", handlers.GetFeed(db))
	api:=r.Group("/api")
	api.Use(middleware.AuthMiddleware(cfg.JWTSecret))
	{
		api.GET("/repos",handlers.GetUserRepos(db))
		api.POST("/repos",handlers.LinkRepo(db,cfg.GroqAPIKey))
		api.POST("/posts",handlers.CreatePost(db))
		api.POST("/posts/:postId/comments", handlers.CreateComment(db))
		api.POST("/posts/:postId/like", handlers.ToggleLike(db))
		api.GET("/posts/:postId/likes", handlers.GetAllLikes(db))
		
	}
}
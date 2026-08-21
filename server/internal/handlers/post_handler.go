package handlers

import (
	"net/http"

	"github.com/bhumika019579/prooffolio/server/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreatePostInput struct {
	RepoID  uint   `json:"repo_id" binding:"required"`
	Caption string `json:"caption"`
}

func CreatePost(db *gorm.DB)gin.HandlerFunc{
	return func(c *gin.Context){
		userID:=c.GetUint("user_id")
		var input CreatePostInput
		if err:=c.ShouldBindJSON(&input);err!=nil{
			c.JSON(http.StatusBadRequest,gin.H{
				"error":"invaild request body"})
			  return 
		}
		var repo models.Repo
		if err:=db.First(&repo,input.RepoID);err!=nil{
			c.JSON(http.StatusBadRequest,gin.H{"error":"repo not found"})
		}
		if repo.UserID!=userID{
			c.JSON(http.StatusForbidden,gin.H{"error":"you dont own this repo"})
			return 
		}
	}
}
package handlers

import (
	"net/http"

	"github.com/bhumika019579/prooffolio/server/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetUserProfile(db *gorm.DB)gin.HandlerFunc{
	return func(c*gin.Context){
		username:=c.Param("username")
        var user models.User
		if err:=db.Where("github_username=?",username).First(&user).Error;err!=nil{
			c.JSON(http.StatusNotFound,gin.H{"error":"user not found"})
			return 
		}
		var posts models.Post
		if err:=db.Where("user_id=?",user.ID).
		Preload("Repo").
		Order("created_at_desc").
		Find(&posts).Error;err!=nil{
          c.JSON(http.StatusInternalServerError,gin.H{"error":"failed to fetch posts"})
		  return 
		}
		c.JSON(http.StatusOK,gin.H{
			"user":user,
			"post":posts,
		})
	}
}
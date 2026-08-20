package handlers

import (
	"net/http"

	"github.com/bhumika019579/prooffolio/server/internal/models"
	"github.com/bhumika019579/prooffolio/server/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetUserRepos(db *gorm.DB)gin.HandlerFunc{
	return func(c *gin.Context){
		userID:=c.GetUint("user_id")
		var user models.User
		if err:=db.First(&user,userID).Error;err!=nil{
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}
		repos,err:=services.FetchUserRepos(user.GithubAccessToken)
		if err!=nil{
			c.JSON(http.StatusInternalServerError,gin.H{"error":err.Error()})
		}
		c.JSON(http.StatusOK,repos)
	}
}
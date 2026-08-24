package handlers

import (
	"net/http"
	"strconv"

	"github.com/bhumika019579/prooffolio/server/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreateCommentInput struct {
	Content string `json:"content" binding:"required"`
}

func CreateComment(db *gorm.DB)gin.HandlerFunc{
	return func( c*gin.Context){
		userID:=c.GetUint("user_id")
		postID:=c.Param("post_id")
		var input CreateCommentInput
		if err:=c.ShouldBindJSON(&input);err!=nil{
			c.JSON(http.StatusBadRequest,gin.H{"error":"invalid request body"})
			return 
		}
		postIDUint, err := strconv.ParseUint(postID, 10, 64)
         if err != nil {
           c.JSON(http.StatusBadRequest, gin.H{"error": "invalid post id"})
           return
		 }
		 var post models.Post
		 if err:=db.First(&post,uint(postIDUint)).Error;err!=nil{
			c.JSON(http.StatusNotFound,gin.H{"error":"post not found"})
			return 
		 }
		 newComment:=models.Comment{
			UserID: userID,
			PostID: uint(postIDUint),
			Content: input.Content,

		 }
		 if err:=db.Create(&newComment).Error;err!=nil{
			c.JSON(http.StatusInternalServerError,gin.H{"error":"failed to create comment"})
			return 
		 }
		 if err:=db.Preload("User").First(&newComment,newComment.ID).Error;err!=nil{
			c.JSON(http.StatusInternalServerError,gin.H{"error":"comment created but failed to load details"})
			return 
		 }
		 c.JSON(http.StatusCreated,newComment)

	}
}
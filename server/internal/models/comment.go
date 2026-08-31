package models

import (
	"time"

	"gorm.io/gorm"
)

type Comment struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `json:"user_id"`
	PostID    uint      `json:"post_id"`
	Content   string    `json:"content"`
	User      User      `gorm:"foreignKey:UserID" json:"user"`
	Post      Post      `gorm:"foreignKey:PostID" json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
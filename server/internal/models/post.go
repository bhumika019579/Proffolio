package models

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `json:"user_id"`
	RepoID    uint      `json:"repo_id"`
	Caption   string    `json:"caption"`
	User      User      `gorm:"foreignKey:UserID" json:"user"`
	Repo      Repo      `gorm:"foreignKey:RepoID" json:"repo"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
package models

import "time"

type User struct {
	ID                uint      `gorm:"primaryKey" json:"id"`
	Name              string    `json:"name"`
	Email             string    `gorm:"unique" json:"email"`
	GithubID          int64     `gorm:"unique" json:"github_id"`
	GithubUsername    string    `gorm:"unique" json:"github_username"`
	GithubAccessToken string    `json:"-"`
	AvatarURL         string    `json:"avatar_url"`
	Bio               string    `json:"bio"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}
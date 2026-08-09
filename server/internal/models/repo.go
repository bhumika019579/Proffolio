package models

import "time"

type Repo struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	UserID      uint      `json:"user_id"`
	RepoURL     string    `json:"repo_url"`
	RepoName    string    `json:"repo_name"`
	Description string    `json:"description"`
	Stars       int       `json:"stars"`
	Forks       int       `json:"forks"`
	CommitCount int       `json:"commit_count"`
	Summary     string    `json:"summary"`
	Status      string    `gorm:"default:pending" json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
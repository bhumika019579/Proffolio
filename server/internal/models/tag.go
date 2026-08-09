package models

type Tag struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"unique" json:"name"`
}

type RepoTag struct {
	ID         uint    `gorm:"primaryKey" json:"id"`
	RepoID     uint    `json:"repo_id"`
	TagID      uint    `json:"tag_id"`
	Percentage float64 `json:"percentage"`
	Repo       Repo    `gorm:"foreignKey:RepoID" json:"-"`
	Tag        Tag     `gorm:"foreignKey:TagID" json:"tag"`
}
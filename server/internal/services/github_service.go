package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type GithubRepo struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	FullName    string `json:"full_name"`
	Description string `json:"description"`
	HTMLURL     string `json:"html_url"`
	Stars       int    `json:"stargazers_count"`
	Forks       int    `json:"forks_count"`
}

func FetchUserRepos(accessToken string) ([]GithubRepo, error) {
	req, err := http.NewRequest("GET","https://api.github.com/user/repos",nil)
	if err!=nil{
		return nil,err
	}
	req.Header.Set("Authorization","Bearer"+accessToken)
	req.Header.Set("Accept","application/json")
	resp,err:=http.DefaultClient.Do(req)
	if err!=nil{
		return nil,fmt.Errorf("failed to reach github:%w",err)
	}
	defer resp.Body.Close()
	body,_:=io.ReadAll(resp.Body)
	if err!=nil{
		return nil,err
	}
	var repos []GithubRepo
	if err:=json.Unmarshal(body,&repos);err!=nil{
		return nil,err
	}
	return repos,nil

}
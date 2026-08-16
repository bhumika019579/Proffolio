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
type LanguageBreakdown struct {
	Name       string
	Percentage float64
}

func FetchUserRepos(accessToken string) ([]GithubRepo, error) {
	req, err := http.NewRequest("GET","https://api.github.com/user/repos",nil)
	if err!=nil{
		return nil,err
	}
	req.Header.Set("Authorization","Bearer "+accessToken)
	req.Header.Set("Accept","application/json")
	resp,err:=http.DefaultClient.Do(req)
	if err!=nil{
		return nil,fmt.Errorf("failed to reach github:%w",err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("github returned status %d", resp.StatusCode)
	}
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
func FetchRepoLanguages(accessToken,owner,repoName string)([]LanguageBreakdown,error){
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/languages", owner, repoName)
	req,err:=http.NewRequest("GET",url,nil)
	if err!=nil{
		return nil,err
	}
	req.Header.Set("Authorization","Bearer "+accessToken)
	req.Header.Set("Accept","application/json")
	resp,err:=http.DefaultClient.Do(req)
	if err!=nil{
		return nil,fmt.Errorf("failed to reach github:%w",err)
	}
	defer resp.Body.Close()
	if resp.StatusCode!=http.StatusOK{
		return nil,fmt.Errorf("github returned status %d",resp.StatusCode)
	}
	body,_:=io.ReadAll(resp.Body)
	if err!=nil{
		return nil,err
	}
	var rawLanguages map[string]int 
	if err:=json.Unmarshal(body,&rawLanguages);err!=nil{
		return nil,err
	}
	var totalBytes int 
	for _,bytes:=range rawLanguages{
		totalBytes+=bytes
	}
	if totalBytes == 0 {
		return []LanguageBreakdown{}, nil
	}
	var breakdown []LanguageBreakdown
	for lang,bytes:=range rawLanguages{
		percentage:=(float64(bytes)/float64(totalBytes))*100
		breakdown=append(breakdown,LanguageBreakdown{
			Name: lang,
			Percentage: percentage,
		})
	}
	return breakdown,nil
}
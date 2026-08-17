package services

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
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
type ReadmeResp struct {
	Content  string `json:"content"`
	Encoding string `json:"encoding"`
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
	if err !=nil{
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
func FetchRepoReadme(accessToken,owner,repoName string)(string, error){
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/readme", owner, repoName)
	req,err:=http.NewRequest("GET",url,nil)
	if err!=nil{
		return "",err
	}
	req.Header.Set("Authorization","Bearer "+accessToken)
	req.Header.Set("Accept","application/json")
	resp,err:=http.DefaultClient.Do(req)
	if err!=nil{
		return "",fmt.Errorf("failed to reach github:%w",err)
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusNotFound {
		return "", nil
	}
	if resp.StatusCode!=http.StatusOK{
		return "",fmt.Errorf("github returned status:%d",resp.StatusCode)
	}
	body,_:=io.ReadAll(resp.Body)
	if err!=nil{
		return "",err
	}
	var readme  ReadmeResp
	if err:=json.Unmarshal(body,&readme);err!=nil{
		return "",err

	}
	decoded,err:=base64.StdEncoding.DecodeString(readme.Content)
	if err != nil {
		return "", fmt.Errorf("failed to decode readme content: %w", err)
	}
	return string(decoded),nil
}
func FetchCommitCount(accessToken,owner,repoName string)(int,error){
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/commits?per_page=1", owner, repoName)
	req,err:=http.NewRequest("GET",url,nil)
	if err!=nil{
		return 0,err
	}
	req.Header.Set("Authorization","Bearer "+accessToken)
	req.Header.Set("Accept","application/json")
	resp,err:=http.DefaultClient.Do(req)
	if err!=nil{
		return 0,fmt.Errorf("failed to reach github:%w",err)
	}
	defer resp.Body.Close()
	if resp.StatusCode!=http.StatusOK{
		return 0,fmt.Errorf("github returned status:%d",resp.StatusCode)
	}
	linkHeader:=resp.Header.Get("link")
	if linkHeader==""{
		return 1,nil
	}
	re:=regexp.MustCompile(`page=(\d+)>; rel="last"`)
	matches:=re.FindStringSubmatch(linkHeader)
	if len(matches)<2{
		return 1,nil
	}
	count,err:=strconv.Atoi(matches[1])
	if err != nil {
		return 0, fmt.Errorf("failed to parse commit count: %w", err)
	}
	return count,nil


}
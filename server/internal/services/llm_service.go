package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type groqMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}
type groqRequest struct {
	Model    string `json:"model"`
	Messages []groqMessage `json:"messages"`
}
type groqResponse struct {
	Choices []struct {
		Message groqMessage `json:"groq message"`
	} `json:"choices"`
}

func GenerateRepoSummary(GroqAPIKey, readme string) (string, error) {
	if readme == "" {
		return "", nil
	}
	prompt := "Summarize this GitHub repository's README in 2-3 concise sentences, focused on what the project does:\n\n" + readme
	reqBody := groqRequest{
		Model: "llama-3.1-8b-instant",
		Messages: []groqMessage{
			{Role: "user", Content: prompt},
		},
	}
	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(jsonBody))
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+GroqAPIKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to reach groq: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("groq returned status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var groqResp groqResponse
	if err := json.Unmarshal(body, &groqResp); err != nil {
		return "", err
	}

	if len(groqResp.Choices) == 0 {
		return "", fmt.Errorf("groq returned no choices")
	}

	return groqResp.Choices[0].Message.Content, nil

}
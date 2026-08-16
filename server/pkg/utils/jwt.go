package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(userID string, Secret string)(string,error) {
	claims := jwt.MapClaims{
		"user_id":userID,
		"exp":time.Now().Add(7*24*time.Hour).Unix(),
	}
	token:=jwt.NewWithClaims(jwt.SigningMethodHS256,claims)
	signedToken,err:=token.SignedString([]byte(Secret))
	if err!=nil{
		return "",err
	}
	return signedToken,nil
}
func VerifyJWT(tokenString string,secret string)(uint,error){
	token,err:=jwt.Parse(tokenString,func(t*jwt.Token)(interface{},error){
		return []byte(secret),nil
	})
	if err!=nil{
		return 0,err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return 0, fmt.Errorf("invalid token")
	}
	userIDFloat, ok := claims["user_id"].(float64)
	if !ok {
		return 0, fmt.Errorf("invalid user_id in token")
	}

	return uint(userIDFloat), nil
}
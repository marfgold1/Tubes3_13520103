package utils

import "regexp"

var regex_dna *regexp.Regexp

func init() {
	regex_dna = regexp.MustCompile(`^[ACGT]+$`)
}

func CheckIsValidDNA(input string) bool {
	return regex_dna.MatchString(input)
}

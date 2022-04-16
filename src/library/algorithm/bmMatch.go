package algorithm

import "github.com/marfgold1/TubesStima3/src/library/utils"

func buildLast(pattern string) []int {
	/* Return array storing index of last
	 * occurence of each DNA char in pattern
	 *
	 * Args :
	 *    pattern : string to search for
	 * Returns :
	 *    []int : last occurence of every char in pattern */
	last := make([]int, 4)
	for i := range last {
		last[i] = -1
	}

	/* Loop through pattern and get last occurence of each char */
	for i, char := range pattern {
		code := utils.GetDnaCode(byte(char))
		last[code] = i
	}
	return last
}

func BMMatch(text, pattern string) int {
	/* Return index of first match of pattern in text,
	 * or -1 if no match
	 *
	 * Args :
	 *    text : string to search in
	 *    pattern : string to search for
	 * Returns :
	 *    int : index of first match of pattern in text, or -1 if no match */

	last := buildLast(pattern)
	n := len(text)
	m := len(pattern)
	i := m - 1

	/* Check if text is shorter than pattern */
	if i > n-1 {
		return -1
	}

	j := m - 1

	/* Loop through text until pattern is found */
	for end := false; !end; end = (i > n-1) {
		if pattern[j] == text[i] { /* Check if char matches */
			if j == 0 {
				return i
			} else {
				i--
				j--
			}
		} else { /* char not match */
			lo := last[utils.GetDnaCode(text[i])]
			i = i + m - utils.Min(j, 1+lo) /* Move i to next possible match */
			j = m - 1
		}
	}
	return -1
}

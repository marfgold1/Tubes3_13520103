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

func BMMatch(text, pattern string) (int, int) {
	/* Return index of first match of pattern in text,
	 * or -1 if no match and max length of matching substring
	 *
	 * Args :
	 *    text : string to search in
	 *    pattern : string to search for
	 * Returns :
	 *    tuple (int, int) : 
	 *        int : index of first match of pattern in text, or -1 if no match
	 *		  int : max length of matching substring */

	last := buildLast(pattern)
	n := len(text)
	m := len(pattern)
	i := m - 1
	max_count := 0
	j := m - 1

	/* Loop through text until pattern is found */
	for end := false; !end; end = (i > n-1) {
		if pattern[j] == text[i] { /* Check if char matches */
			if j == 0 {
				return i, m
			} else {
				i--
				j--
			}
		} else { /* char not match */
			max_count = utils.Max(max_count, m - j - 1)
			lo := last[utils.GetDnaCode(text[i])]
			i = i + m - utils.Min(j, 1+lo) /* Move i to next possible match */
			
			j = m - 1
		}
	}
	
	i = n - 1
	j = m - 1
	/* Check max length of last matching substring */
	for end := false; !end; end = (i > n-1) {
		if pattern[j] == text[i] { /* Check if char matches */
			i--
			j--
		} else { /* char not match */
			max_count = utils.Max(max_count, m - j - 1)
			i = n
		}
	}

	return -1, max_count
}

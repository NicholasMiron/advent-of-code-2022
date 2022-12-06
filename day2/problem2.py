sample1 = open('./inputs/sample1.txt', 'r').read()
input1 = open('./inputs/input1.txt', 'r').read()


def solution(input_txt):
    points = {
        'X': {'A': 3, 'B': 1, 'C': 2,},
        'Y': {'A': 4, 'B': 5, 'C': 6,},
        'Z': {'A': 8, 'B': 9, 'C': 7,},
    }

    lines = input_txt.split('\n')
    total_points = 0

    for line in lines:
        total_points += points[line[2]][line[0]]

    return total_points


print('sample:', solution(sample1))
print('solution:', solution(input1))
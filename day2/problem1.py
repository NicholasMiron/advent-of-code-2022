sample1 = open('./inputs/sample1.txt', 'r').read()
input1 = open('./inputs/input1.txt', 'r').read()


def solution(input_txt):
    points = {
        'AX': 4, 'AY': 8, 'AZ': 3,
        'BX': 1, 'BY': 5, 'BZ': 9,
        'CX': 7, 'CY': 2, 'CZ': 6,
    }

    lines = input_txt.split('\n')
    total_points = 0

    for line in lines:
        total_points += points[line[0] + line[2]]

    return total_points


print('sample:', solution(sample1))
print('solution:', solution(input1))

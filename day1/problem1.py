sample1 = open('./inputs/sample1.txt', 'r').read()
input1 = open('./inputs/input1.txt', 'r').read()


def solution(input_txt):
    totals = []
    lines = input_txt.split('\n')
    cur_sum = 0

    for lineStr in lines:
        if lineStr != '':
            cur_sum += int(lineStr)
        else:
            totals.append(cur_sum)
            cur_sum = 0

    if cur_sum > 0:
        totals.append(cur_sum)

    return max(totals)


print('sample:', solution(sample1))
print('solution:', solution(input1))

import matplotlib.pyplot as plt
from math import *
from sys import argv

def graph(function, step = 0.1, lowerX = 0, upperX = 10):
    yAxis = []
    xAxis = []

    x = lowerX

    while (x < upperX + step):
        yAxis.append(function(x))
        xAxis.append(x)

        x += step

    plt.plot(xAxis, yAxis)

    plt.savefig('./assets/graphTemp/tempImg.png')

def main():
        graph(lambda x: eval(argv[1]), eval(argv[2]), eval(argv[3]), eval(argv[4]))

if __name__ == "__main__":
    main()
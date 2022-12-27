# Algorithm Visualisations

## About the project

Visualisations are a useful and important way of understanding complex concepts, and the aim of this project is to provide such visualisations for a range of common algorithms, as well as serving as an exercise in implementing these algorithms in JavaScript.
The page is hosted using GitHub pages [here](https://benleong0.github.io/AlgorithmVisualisations/)

## [Sorting Algorithms](https://benleong0.github.io/AlgorithmVisualisations/sorting/sorting.html)

This page includes visualisations for a number of common sorting algorithms. These algorithms are:

- Quicksort
- Merge sort
- Bubble sort
- Counting sort
- Heapsort
- Radix sort
- Random sort / Bogosort
  - Note: Do not run random sort with > 10 elements, as it is very computationally intensive and essentially neverending.
  - If such a sort is initialised, either reload the page or initalise a different sorting algorithm to override it.

![quicksort example](https://user-images.githubusercontent.com/71988019/110109590-92bf0480-7da5-11eb-995f-0fdde46f151a.gif)

The objects being sorted are represented by bars of varying lengths, the number of which can be altered by adjusting the slider at the top.
Initilise sortings by clicking on the name of the sort you want to view, and a new array of bars will be generated.

Future plans:

- [ ] Time and space complexity information.
- [ ] Custom number of bars.
  - For example, the visualisation for radix sort makes a lot more sense using elements with at least 3 digits.

## [Random Maze Generator](https://benleong0.github.io/AlgorithmVisualisations/maze/maze.html)

This visualisation uses Depth-First Search (DFS) to generate a maze within a grid.

- The dimensions of the grid can be adjusted using the sliders at the top.
- The start point is randomly selected at the beginning.
- The end point is randomly selected at the end, from the set of all possible end points.

![dfs-maze](https://user-images.githubusercontent.com/71988019/110111098-b5eab380-7da7-11eb-8490-6fd6544c7d75.gif)

## [Path Finder](https://benleong0.github.io/AlgorithmVisualisations/pathfind/pathfind.html)

For this page, a start point and end point are generated within a box. The user can then draw walls between the two points, after which the program will find the shortest path between the two points.

- This uses Breadth First Search (BFS) to find the shortest path, which is shown in the visualisation.
- An alert is raised if there is no possible path between the two points.
- Walls can be drawn by dragging across the screen (not on mobile unfortunately).

![bfs-pathfinder](https://user-images.githubusercontent.com/71988019/110111101-b6834a00-7da7-11eb-8aeb-f7569e42727f.gif)

## [Sudoku Solver](https://benleong0.github.io/AlgorithmVisualisations/sudoku/sudoku.html)

This page uses a recursive backtracking algorithm to solve Sudoku puzzles.

- Users can input their own puzzle, or generate one from a saved set of 10,000.
- There are options to either solve the puzzle instantly, or to view the algorithms as it solves (both using the backtracking algorithm).
- There is a checking feature, where a user can identify contradictions within their solution.
  - Note: this does not mark all incorrect squares, but only when there is a direct clash between two inputs.

![sudoku-solving](https://user-images.githubusercontent.com/71988019/110111102-b6834a00-7da7-11eb-91c3-ec844e168dea.gif)

## [Planet Simulator](https://benleong0.github.io/AlgorithmVisualisations/planets/planets.html)

This page simulates 2-dimensional bodies ("planets") in space, and how gravity would act on them.

- It generates objects of different sizes, the number of which can be adjusted using the slider at the top.

![planet-sim](https://user-images.githubusercontent.com/71988019/110112443-abc9b480-7da9-11eb-9297-680e3198aaa4.gif)

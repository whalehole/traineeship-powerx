import random
from random import randint
from random import seed

class Board:
    def __init__(self, rows=0, columns=0):
        self._rows = rows
        self._columns = columns
        # create 2d matrix for board
        self.board = [[0 for i in range(self.columns)] for j in range(self.rows)]
    @property
    def dimen(self):
        return (self._rows, self._columns)
    @property
    def rows(self):
        return self._rows
    @property
    def columns(self):
        return self._columns
    @rows.setter
    def rows(self, n):
        self._rows = n
        return self._rows
    @columns.setter
    def columns(self, n):
        self._columns = n
        return self._columns
    def showBoard(self):
        print('\n'.join([''.join(['{:4}'.format(item) for item in row]) for row in self.board]))
    def getBoard(self):
        return self.board
    def init_wall(self, width=6, length=8):
        topLeftCorner = random.randint(0, self._rows - width - 2)
        for i in range(topLeftCorner, topLeftCorner + width + 2):
            self.board[i][0] = 1
            self.board[i][length + 1] = 1
        for j in range(length + 2):
            self.board[topLeftCorner][j] = 1
            self.board[topLeftCorner + width + 1][j] = 1
    def add_to_board(self, player):
        if isinstance(player, Snake):
            name = f"S{player.name.split()[1]}"
        elif isinstance(player, Mouse):
            name = f"M{player.name.split()[1]}"
        for row in self.board:
            if name in row:
                row[row.index(name)] = 0
        if player.status != "dead":
            for coord in player.position:
                self.board[coord[1]][coord[0]] = name

class Queue:
    def __init__(self):
        self.__items = []
    def enqueue(self, item):
        self.__items.append(item)
    def dequeue(self):
        if self.is_empty:
            return None
        else:
            item = self.__items[0]
            self.__items = self.__items[1:]
            return item
    def peek(self):
        return None if self.is_empty else self.__items[0]
    @property
    def is_empty(self):
        return self.size == 0
    @property
    def size(self):
        return len(self.__items)

# COORD
class Coord:
    def __init__(self, x_coord=0, y_coord=0):
        self._coord = (x_coord, y_coord)

    @property
    def coord(self):
        return self._coord

    @coord.setter
    def coord(self, coords):
        if isinstance(coords[0], int) and isinstance(coords[1], int) and coords[0] >= 0 and coords[1] >= 0:
            self._coord = (coords[0], coords[1])

class Object:
    def __init__(self):
        self._coord = Coord()
    @property
    def coord(self):
        return self._coord.coord
    def move(self, direction):
        if direction == "D":
            self._coord.coord = (self._coord.coord[0], self._coord.coord[1] + 1)
            return self._coord.coord
        elif direction == "U":
            self._coord.coord = (self._coord.coord[0], self._coord.coord[1] - 1)
            return self._coord.coord
        elif direction == "L":
            self._coord.coord = (self._coord.coord[0] - 1, self._coord.coord[1])
            return self._coord.coord
        elif direction == "R":
            self._coord.coord = (self._coord.coord[0] + 1, self._coord.coord[1])
            return self._coord.coord
    def moved(self, direction):
        if direction == "D":
            return self._coord.coord[0], self._coord.coord[1] + 1
        elif direction == "U":
            return self._coord.coord[0], self._coord.coord[1] - 1
        elif direction == "L":
            return self._coord.coord[0] - 1, self._coord.coord[1]
        elif direction == "R":
            return self._coord.coord[0] + 1, self._coord.coord[1]
    def teleport(self, coords):
        self._coord.coord = (coords[0], coords[1])
        return self._coord.coord
    def __eq__(self, other):
        if isinstance(other, Object):
            return True if self._coord.coord == other._coord.coord else False
        if isinstance(other, tuple):
            return True if self._coord.coord == other else False

class MouseHead(Object):
    def __init__(self):
        super().__init__()

class Mouse:
    def __init__(self, name):
        self.head = MouseHead()
        self._name = f"Mouse {name}"
        self._status = "alive"
        self._turns = 3
        self._moved = None
    def __add__(self, other):
        if isinstance(other, Snake):
            if self._moved == other.position[0]:
                print("mouse is eaten by a snake!")
                self._status = "dead"
                return "dead", self, other
            if self._moved == other.position[1] or self._moved == other.position[2]:
                print("mouse bumped onto the snake's body!")
                self._status = "dazed"
                return "dazed", self, other
        if isinstance(other, Mouse):
            if self._moved == other.position[0]:
                print("mouse bumped into another mouse!")
                self._status = "dazed"
                return "dazed", self, other
        self._status = "alive"
        return "alive"
    @property
    def position(self):
        return [self.head.coord]
    def get_moved(self):
        return self._moved
    @property
    def name(self):
        return self._name
    @property
    def status(self):
        return self._status
    @property
    def turns(self):
        return self._turns
    @turns.setter
    def turns(self, n):
        self._turns = n
        return self._turns
    @status.setter
    def status(self, state):
        self._status = state
        return self._status
    def move(self, direction):
        if direction == "U":
            self._turns -= 1
            return self.head.move("U")
        elif direction == "D":
            self._turns -= 1
            return self.head.move("D")
        elif direction == "L":
            self._turns -= 1
            return self.head.move("L")
        elif direction == "R":
            self._turns -= 1
            return self.head.move("R")
    def moved(self, direction):
        self._moved = self.head.moved(direction)
        return self._moved
    def place(self, coords):
        return self.head.teleport(coords[0])

class SnakeHead(Object):
    def __init__(self):
        super().__init__()

class SnakeBody(Object):
    def __init__(self):
        super().__init__()

class SnakeTail(Object):
    def __init__(self):
        super().__init__()

class Snake:
    def __init__(self, name):
        self.head = SnakeHead()
        self.body = SnakeBody()
        self.tail = SnakeTail()
        self._name = f"Snake {name}"
        self._status = "alive"
        self._turns = 5
        self._moved = None
    def __add__(self, other):
        if isinstance(other, Snake):
            if self._moved == other.position[0] or self._moved == other.position[1] or self._moved == other.position[2]:
                print("snake bumped into another snake!")
                self._status = "dazed"
                return "dazed", self, other
        if isinstance(other, Mouse):
            if self._moved == other.position[0]:
                print("snake has eaten a mouse, yummy!")
                self._status = "satiated"
                other.status = "dead"
                return "satiated", self, other
        self._status = "alive"
        return "alive"
    @property
    def status(self):
        return self._status
    def get_moved(self):
        return self._moved
    @property
    def position(self):
        return [self.head.coord, self.body.coord, self.tail.coord]
    @property
    def name(self):
        return self._name
    @property
    def turns(self):
        return self._turns
    @status.setter
    def status(self, state):
        self._status = state
        return self._status
    @turns.setter
    def turns(self, n):
        self._turns = n
        return self._turns
    def place(self, coords):
        self.head.teleport(coords[0])
        if len(coords) == 3:
            self.body.teleport(coords[1])
            self.tail.teleport(coords[2])
        return self.position
    def move(self, direction):
        if direction == "U":
            if self.body == self.moved("U"):
                print("illegal move!")
                return "illegal move!"
            else:
                self.tail.teleport(self.body._coord.coord)
                self.body.teleport(self.head._coord.coord)
                self.head.move("U")
                self._turns -= 1
                return self.position
        if direction == "D":
            if self.body == self.moved("D"):
                print("illegal move!")
                return "illegal move!"
            else:
                self.tail.teleport(self.body._coord.coord)
                self.body.teleport(self.head._coord.coord)
                self.head.move("D")
                self._turns -= 1
                return self.position
        if direction == "L":
            if self.body == self.moved("L"):
                print("illegal move!")
                return "illegal move!"
            else:
                self.tail.teleport(self.body._coord.coord)
                self.body.teleport(self.head._coord.coord)
                self.head.move("L")
                self._turns -= 1
                return self.position
        if direction == "R":
            if self.body == self.moved("R"):
                print("illegal move!")
                return "illegal move!"
            else:
                self.tail.teleport(self.body._coord.coord)
                self.body.teleport(self.head._coord.coord)
                self.head.move("R")
                self._turns -= 1
                return self.position
    def moved(self, direction):
        self._moved = self.head.moved(direction)
        return self._moved

class Game:
    def __init__(self):
        self.board = None
        self.snakes = {}
        self.mice = {}
        self._rounds = None
        self.moves = Queue()
        self._game_state = {"State": None, "Snakes": self.snakes, "Mice": self.mice, "Rounds": self._rounds,
                            "Board": self.board, "Interactions": None}
    def addMouse(self):
        name = str(len(self.mice) + 1)
        self.mice[name] = Mouse(name)
        return self.mice[name].name
    def addSnake(self):
        name = str(len(self.snakes) + 1)
        self.snakes[name] = Snake(name)
        return self.snakes[name].name
    @property
    def rounds(self):
        return self._rounds
    @rounds.setter
    def rounds(self, n):
        self._rounds = n
    @property
    def game_state(self):
        return self._game_state
    def get_board(self):
        return self.board.getBoard()
    def update_game_state(self, state):
        for key in state:
            self._game_state[key] = state[key]
        return self._game_state
    def check_game_state(self):
        if self.turns_done() == True:
            self._rounds -= 1
            if self.game_done()[0] == True:
                print("game has ended")
                self.update_game_state({"State": "End"})
            print("next round begins")
            self.restore_turns()
        if self.game_done()[0] == True:
            print("game has ended")
            self.update_game_state({"State": "End"})
    def display_board(self):
        self.board.showBoard()
    def init_board(self, x, y):
        self.board = Board(x, y)
        self.board.showBoard()
        print(self.board.dimen)
        return self.board.dimen
    def randomize_position(self, n):
        positions = []
        for p in range(n):
            x = randint(0, self.board.dimen[0] - 1)
            y = randint(2, self.board.dimen[1] - 3)
            positions.append((x, y))
        return positions
    def check_positions(self, positions):
        n = len(positions)
        for p in range(n):
            for o in range(p + 1, n):
                if abs(positions[p][0] - positions[o][0]) < 3 or abs(positions[p][1] - positions[o][1]) < 3:
                    return False
        return True
    def randomize_all_positions(self, n):
        randomized = False
        positions = None
        while randomized == False:
            positions = self.randomize_position(n)
            randomized = True if self.check_positions(positions) else False
        return positions
    def randomize_tail(self, snake, length, obstacles):
        #         generate tail recursively
        position = [snake.position[0]]
        obstacles = list(obstacles)
        obstacles.remove(position[0])
        def randomize_helper(init_pos, prev_pos=position[0]):
            if len(position) == length:
                return
            if (init_pos[0] + 1 > self.board.dimen[0] - 1 or init_pos[0] + 1 in [p[0] for p in obstacles]) and (
                    init_pos[0] - 1 < 0 or init_pos[0] - 1 in [p[0] for p in obstacles]):
                if init_pos[1] + 1 > self.board.dimen[1] - 1 or init_pos[1] + 1 in [p[1] for p in obstacles]:
                    y = init_pos[1] - 1
                elif init_pos[1] - 1 < 0 or init_pos[1] - 1 in [p[1] for p in obstacles]:
                    y = init_pos[1] + 1
                else:
                    y = random.choice([init_pos[1] + 1, init_pos[1] - 1])
                new_pos = (init_pos[0], y)
            elif (init_pos[1] + 1 > self.board.dimen[1] - 1 or init_pos[1] + 1 in [p[1] for p in obstacles]) and (
                    init_pos[1] - 1 < 0 or init_pos[1] - 1 in [p[1] for p in obstacles]):
                if init_pos[0] + 1 > self.board.dimen[0] - 1 or init_pos[0] + 1 in [p[0] for p in obstacles]:
                    x = init_pos[0] - 1
                elif init_pos[0] - 1 < 0 or init_pos[0] - 1 in [p[0] for p in obstacles]:
                    x = init_pos[0] + 1
                else:
                    x = random.choice([init_pos[0] + 1, init_pos[0] - 1])
                new_pos = (x, init_pos[1])
            else:
                r_xy = randint(0, 1)
                if r_xy == 0:
                    if init_pos[0] + 1 > self.board.dimen[0] - 1 or init_pos[0] + 1 in [p[0] for p in obstacles]:
                        x = init_pos[0] - 1
                    elif init_pos[0] - 1 < 0 or init_pos[0] - 1 in [p[0] for p in obstacles]:
                        x = init_pos[0] + 1
                    else:
                        x = random.choice([init_pos[0] + 1, init_pos[0] - 1])
                    new_pos = (x, init_pos[1])
                elif r_xy == 1:
                    if init_pos[1] + 1 > self.board.dimen[1] - 1 or init_pos[1] + 1 in [p[1] for p in obstacles]:
                        y = init_pos[1] - 1
                    elif init_pos[1] - 1 < 0 or init_pos[1] - 1 in [p[1] for p in obstacles]:
                        y = init_pos[1] + 1
                    else:
                        y = random.choice([init_pos[1] + 1, init_pos[1] - 1])
                    new_pos = (init_pos[0], y)
            position.append(new_pos)
            obstacles.append(init_pos)
            randomize_helper(new_pos, init_pos)
        randomize_helper(position[0])
        snake.place(position)
    def init_position(self):
        n = len(self.mice) + len(self.snakes)
        positions = self.randomize_all_positions(n)
        players_list = list(self.mice.values()) + list(self.snakes.values())
        for p in range(n):
            players_list[p].place([positions[p]])
            if isinstance(players_list[p], Mouse):
                print("mouse position", players_list[p].position)
        for p in players_list:
            if isinstance(p, Snake):
                self.randomize_tail(p, 3, positions)
        for p in players_list:
            self.board.add_to_board(p)
    def start(self):
        self._rounds = 5
        self.init_position()
    #         self._game_state["State"] = "live"
    #         while self._game_state["State"] == "live":
    #             self.proceed()
    def restore_turns(self):
        for snake in self.snakes:
            self.snakes[snake].turns = 5
        for mouse in self.mice:
            self.mice[mouse].turns = 3
    def turns_done(self):
        for snake in self.snakes:
            if self.snakes[snake].turns > 0:
                return False
        for mouse in self.mice:
            if self.mice[mouse].turns > 0:
                return False
        return True
    def game_done(self):
        for mouse in self.mice:
            if self.mice[mouse].status == "alive":
                if self._rounds != 0:
                    return (False,)
                else:
                    return True, "mice win"
        return True, "snakes win"
    def queue_move(self, move):
        self.moves.enqueue(move)
        return move
    def proceed(self):
        if self.moves.is_empty == False:
            name, species, direction = self.moves.dequeue()
            packet = {"incident": None}
            if species == "Snake":
                snake = self.snakes[name]
                if snake.turns > 0 and snake != "dead":
                    snake.moved(direction)
                    # check if any wall or obstacle is in the way
                    if (snake.get_moved()[0] < 0 or snake.get_moved()[0] > self.board.dimen[0] - 1) or (
                            snake.get_moved()[1] < 0 or snake.get_moved()[1] > self.board.dimen[1] - 1):
                        self.update_game_state({"Interactions": (snake, "collide", "wall")})
                        self.check_game_state()
                        packet["incident"] = self._game_state
                        game.display_board()
                        return packet
                    elif self.get_board()[snake.get_moved()[1]][snake.get_moved()[0]] == 1:
                        self.update_game_state({"Interactions": (snake, "collide", "wall")})
                        self.check_game_state()
                        packet["incident"] = self._game_state
                        game.display_board()
                        return packet
                    # check if any snake is in the way
                    for key in self.snakes:
                        other_snake = self.snakes[key]
                        incident = snake + other_snake
                        if incident == ("dazed", snake, other_snake):
                            print("snake collides snake")
                            self.update_game_state({"Interactions": (snake, "collide", other_snake)})
                            self.check_game_state()
                            packet["incident"] = self._game_state
                            game.display_board()
                            return packet
                    # check if any mouse is in the way
                    for key in self.mice:
                        mouse = self.mice[key]
                        incident = snake + mouse
                        if incident == ("satiated", snake, mouse):
                            print("snake eaten mouse")
                            snake.move(direction)
                            self.board.add_to_board(snake)
                            self.update_game_state({"Interactions": (snake, "eat", mouse)})
                            self.check_game_state()
                            packet["incident"] = self._game_state
                            game.display_board()
                            return packet
                    print("snake moves")
                    snake.move(direction)
                    self.board.add_to_board(snake)
                    self.update_game_state({"Interactions": (snake, "move")})
                    self.check_game_state()
                    packet["incident"] = self._game_state
                    game.display_board()
                    return packet
                # if player with no turns make a move, return no change to game state
                elif snake.turns <= 0:
                    print(snake.name, "out of turns!")
                    self.update_game_state({"Interactions": (snake, "out of turns")})
                    self.check_game_state()
                    packet["incident"] = self._game_state
                    game.display_board()
                    return packet
                elif snake.status == "dead":
                    print(snake.name, "is dead")
                    self.update_game_state({"Interactions": (snake, "dead")})
                    self.check_game_state()
                    packet["incident"] = self._game_state
                    return packet

            elif species == "Mouse":
                mouse = self.mice[name]
                if mouse.turns > 0 and mouse.status != "dead":
                    mouse.moved(direction)
                    if (mouse.get_moved()[0] < 0 or mouse.get_moved()[0] > self.board.dimen[0] - 1) or (
                            mouse.get_moved()[1] < 0 or mouse.get_moved()[1] > self.board.dimen[1] - 1):
                        self.update_game_state({"Interactions": (mouse, "collide", "wall")})
                        self.check_game_state()
                        packet["incident"] = self._game_state
                        game.display_board()
                        return packet
                    elif self.get_board()[mouse.get_moved()[1]][mouse.get_moved()[0]] == 1:
                        self.update_game_state({"Interactions": (mouse, "collide", "wall")})
                        self.check_game_state()
                        packet["incident"] = self._game_state
                        game.display_board()
                        return packet
                    for key in self.snakes:
                        snake = self.snakes[key]
                        incident = mouse + snake
                        if incident == ("dazed", mouse, snake):
                            print("mouse collides snake")
                            self.update_game_state({"Interactions": (mouse, "collide", snake)})
                            self.check_game_state()
                            packet["incident"] = self._game_state
                            game.display_board()
                            return packet
                        elif incident == ("dead", mouse, snake):
                            print("mouse walk into snake's mouth")
                            self.update_game_state({"Interactions": (mouse, "eaten by", snake)})
                            self.check_game_state()
                            packet["incident"] = self._game_state
                            self.board.add_to_board(mouse)
                            game.display_board()
                            return packet
                    for key in self.mice:
                        other_mouse = self.mice[key]
                        incident = mouse + mouse
                        if incident == ("dazed", mouse, other_mouse):
                            print("mouse collides mouse")
                            self.update_game_state({"Interactions": (mouse, "collide", mouse)})
                            self.check_game_state()
                            packet["incident"] = self._game_state
                            game.display_board()
                            return packet
                    print("mouse moves")
                    mouse.move(direction)
                    self.board.add_to_board(mouse)
                    self.update_game_state({"Interactions": (mouse, "move")})
                    self.check_game_state()
                    packet["incident"] = self._game_state
                    game.display_board()
                    return packet
                elif mouse.turns <= 0:
                    print(mouse.name, "out of turns!")
                    self.update_game_state({"Interactions": (mouse, "out of turns")})
                    self.check_game_state()
                    packet["incident"] = self._game_state
                    game.display_board()
                    return packet
                elif mouse.status == "dead":
                    print(mouse.name, "is dead")
                    self.update_game_state({"Interactions": (mouse, "dead")})
                    self.check_game_state()
                    packet["incident"] = self._game_state
                    game.display_board()
                    return packet
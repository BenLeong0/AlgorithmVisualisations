from random import choice

suits = ['H', 'S', 'C', 'D'];
numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


def draw(player1, player2):
    while True:
        card = choice(numbers) + choice(suits);
        if not (card in player1 or card in player2):
            return card


def value(card):
    number = card[:-1];
    if number in ['J', 'Q', 'K']:
        return 10
    elif number == 'A':
        return 1
    else:
        return int(number)


def score(player):
    current_score = 0
    ace = False
    for card in player:
        current_score += value(card)
        if card[0] == 'A':
            ace = True
    if (ace) and (current_score < 12):
        current_score += 10
    return current_score


def hand(player):
    result = player[0]
    for card in player[1:]:
        result += ' ' + card
    return result


first_time = True
while True:
    if first_time:
        first_time = False
    else:
        input("\nPress enter to play again.")
        print("============================")
    dealer = [];
    player = [];

    dealer.append(draw(player, dealer))
    dealer.append(draw(player, dealer))
    player.append(draw(player, dealer))
    player.append(draw(player, dealer))

    if score(dealer) == 21:
        if score(player) == 21:
            print(" Dealer's hand: ", hand(dealer))
            print("     Your hand: ", hand(player))
            print("It's a tie!")
        else:
            print(" Dealer's hand: ", hand(dealer))
            print("     Your hand: ", hand(player))
            print("Dealer Blackjack - You lose...")
    elif score(player) == 21:
        print(" Dealer's hand: ", hand(dealer))
        print("     Your hand: ", hand(player))
        print("BLACKJACK - You win!")
    else:
        print(" Dealer's hand: ", dealer[0], '??')
        print("     Your hand: ", hand(player))

        # Player choices
        while True:
            while True:
                print("What would you like to do?")
                print("0: Stand")
                print("1: Hit")
                decision = input()
                if decision in ['0','1']:
                    break
                print("Invalid input!")
            if decision == '0':
                break
            player.append(draw(player, dealer))
            print(" Dealer's hand: ", dealer[0], '??')
            print("     Your hand: ", hand(player))
            if score(player) == 21:
                break
            elif score(player) > 21:
                print("Bust - You lose...")
                break
            # elif 17 <= score(dealer) < score(player):
            #     print("You win!")
            #     break
        if score(player) > 21:
            continue

        # Dealer choices
        while True:
            print(" Dealer's hand: ", hand(dealer))
            print("     Your hand: ", hand(player))
            if score(dealer) > 21:
                print("You win!")
                break
            elif score(dealer) > score(player):
                print("You lose...")
                break
            elif score(dealer) > 16:
                if score(dealer) < score(player):
                    print("You win!")
                    break
                else:
                    print("It's a tie!")
                    break
            else:
                print("Dealer hits...")
                dealer.append(draw(player, dealer))

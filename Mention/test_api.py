import requests

BASE_URL = 'http://localhost:5000'

def create_group(name):
    response = requests.get(f'{BASE_URL}/groups/id/{name}')
    print(f'Create or retrieve group "{name}":', response.json())

def create_mention(group_id, mention_name):
    response = requests.post(f'{BASE_URL}/mentions/create/{group_id}', json={'name': mention_name})
    print(f'Create mention "{mention_name}":', response.json())

def add_member(mention_id, phone_number):
    response = requests.post(f'{BASE_URL}/members/create/{mention_id}', json={'phone_number': phone_number})
    print(f'Add member with phone number "{phone_number}":', response.json())

def get_members(mention_id):
    response = requests.get(f'{BASE_URL}/members/all/{mention_id}')
    print(f'Get all members for mention ID {mention_id}:', response.json())

def get_member_id(phone_number):
    response = requests.get(f'{BASE_URL}/members/id/{phone_number}')
    print(f'Get member ID for phone number "{phone_number}":', response.json())

def delete_member(member_id):
    response = requests.delete(f'{BASE_URL}/members/remove/{member_id}')
    print(f'Delete member ID {member_id}:', response.json())

def delete_mention(mention_id):
    response = requests.delete(f'{BASE_URL}/mentions/remove/{mention_id}')
    print(f'Delete mention ID {mention_id}:', response.json())

def update_mention(mention_id, new_name):
    response = requests.put(f'{BASE_URL}/mentions/update/{mention_id}', json={'name': new_name})
    print(f'Update mention ID {mention_id} to new name "{new_name}":', response.json())

# Example Usage
if __name__ == "__main__":
    create_group('Test Group')

    group_id = 1

    create_mention(group_id, 'Test Mention')

    mention_id = 1

    add_member(mention_id, '1234567890')
    add_member(mention_id, '0987654321')

    get_members(mention_id)

    get_member_id('1234567890')

    delete_member(1)

    update_mention(mention_id, 'Updated Mention')

    delete_mention(mention_id)

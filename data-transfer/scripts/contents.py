from models.Content import Content
import requests


def import_contents(tumeplay_base_url, tumeplay_api, strapi_base_api, theme_ids):
    response = requests.get(tumeplay_api + '/contents')
    json_contents = response.json()

    contents = []
    for content in json_contents:
        contents.append(
            Content(
                content['title'],
                content['text'],
                tumeplay_base_url + '/' + content['picture'],
                theme_ids.get(content['theme'])
            )
        )

    for content in contents:
        content_image = content.get_image()
        if content_image and content_image is not None:
            response = requests.post(strapi_base_api + "/upload",
                                     files={'files': (
                                     content_image.name[content_image.name.rindex('/') + 1:], content_image,
                                     'image/png', {'Expires': '0'})})
            json_response = response.json()
            image_id = json_response[0]['id']

        requests.post(strapi_base_api + "/contents", data={
            "title": content.title,
            "text": content.text,
            "image": image_id,
            "theme": content.theme_id
        })

    print(str(len(contents)) + ' contenus insérés')
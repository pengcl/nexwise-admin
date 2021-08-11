const data = {
  "id": {
    "type": "integer"
  },
  "name": {
    "type": "string",
    "required": false,
    "unique": true,
    "maxLength": 10,
    "minLength": 2
  },
  "name_cn": {
    "type": "string",
    "required": false,
    "unique": true,
    "maxLength": 10,
    "minLength": 2
  },
  "name_en": {
    "type": "string",
    "required": false,
    "unique": true,
    "maxLength": 10,
    "minLength": 2
  },
  "name_hk": {
    "type": "string",
    "required": false,
    "unique": true,
    "maxLength": 10,
    "minLength": 2
  },
  "description": {
    "type": "text"
  },
  "description_cn": {
    "type": "text"
  },
  "description_en": {
    "type": "text"
  },
  "description_hk": {
    "type": "text"
  },
  "menus": {
    "collection": "menu",
    "via": "menu",
    "isVirtual": true,
    "type": "relation",
    "targetModel": "application::menu.menu",
    "relationType": "oneToMany"
  },
  "menu": {
    "model": "menu",
    "via": "menus",
    "type": "relation",
    "targetModel": "application::menu.menu",
    "relationType": "manyToOne"
  },
  "thumb": {
    "type": "media",
    "multiple": false,
    "required": false,
    "allowedTypes": [
      "images",
      "files",
      "videos"
    ]
  },
  "poster": {
    "type": "media",
    "multiple": true,
    "required": false,
    "allowedTypes": [
      "images",
      "files",
      "videos"
    ]
  },
  "show": {
    "type": "boolean",
    "default": true
  },
  "content": {
    "type": "richtext"
  },
  "content_cn": {
    "type": "richtext"
  },
  "content_en": {
    "type": "richtext"
  },
  "content_hk": {
    "type": "richtext"
  },
  "content_type": {
    "model": "content-type",
    "type": "relation",
    "targetModel": "application::content-type.content-type",
    "relationType": "oneWay"
  },
  "tags": {
    "collection": "tag",
    "attribute": "tag",
    "column": "id",
    "isVirtual": true,
    "type": "relation",
    "targetModel": "application::tag.tag",
    "relationType": "manyWay"
  },
  "template": {
    "model": "template",
    "type": "relation",
    "targetModel": "application::template.template",
    "relationType": "oneWay"
  }
}

const ABANDON_KEYS = ['created_at', 'published_at', 'updated_at']; // 过滤无关字段
const ABANDON_KEY_PREFIX_LIST = ['name', 'title', 'content', 'description', 'body']; // 过滤语言字段
const abandonKeys = (contentType) => {
  const dto = {};
  for (const key in contentType) {
    if (ABANDON_KEYS.indexOf(key) === -1) {// 过滤无关字段
      dto[key] = contentType[key];
    }
  }
  return dto;
};

const abandonLanguages = (contentType, codes, currentCode) => {
  const dto = {};
  // tslint:disable-next-line
  const filterKeys = ABANDON_KEY_PREFIX_LIST;
  ABANDON_KEY_PREFIX_LIST.forEach(key_prefix => {
    codes.forEach(code => {
      filterKeys.push(key_prefix + '_' + code)
    });
  });
  for (const key in contentType) {
    if (filterKeys.indexOf(key) === -1) {
      dto[key] = contentType[key]
    }
    if(key === 'name' + '_' + currentCode || key === 'title' + '_' + currentCode){
      dto[key].required = true;
    }
  }
  /*for (const key in contentType) {
    let filterKey = false;
    for (const i in ABANDON_LANGUAGES) {
      if (key.startsWith(ABANDON_LANGUAGES[i]) && !key.endsWith(lan)) {
        console.log(key);
        filterKey = true;
        break;
      }
    }
    if (!filterKey) {
      dto[key] = contentType[key];
      if (key.endsWith(lan) && (key.indexOf('name') !== -1 || key.indexOf('title') !== -1)) {
        dto[key].required = true;
      }
    }
  }*/
  return dto;
};

const dto = abandonLanguages(data, ['en', 'hk'])

console.log(dto);

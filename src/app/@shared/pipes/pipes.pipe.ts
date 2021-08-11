import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'repairDate',
  pure: false
})

@Injectable()
export class RepairDatePipe implements PipeTransform {
  transform(value): any {
    value = value.split('.')[0].replace(/\-/g, '/');
    return value;
  }
}

@Pipe({
  name: 'detail',
  pure: false
})
@Injectable()
export class DetailPipe implements PipeTransform {
  transform(html): any {
    if (!html) {
      return html;
    }
    return html.replace(/img src="/g, 'img src="/api');
  }
}

@Pipe({
  name: 'html',
  pure: false
})
@Injectable()
export class HtmlPipe implements PipeTransform {
  transform(value): any {
    if (!value) {
      return value;
    }
    return value.replace(/\n/g, '<br/>');
  }
}

@Pipe({
  name: 'lan',
  pure: false
})
@Injectable()
export class LanPipe implements PipeTransform {

  transform(value): any {
    if (!value) {
      return value;
    }
    return value.replace(/\n/g, '<br/>');
  }
}

@Pipe({
  name: 'customType',
  pure: false
})
@Injectable()
export class CustomTypePipe implements PipeTransform {

  transform(customTypes, menu): any {
    if (!customTypes || !menu) {
      return customTypes;
    }
    if (customTypes && menu) {
      return customTypes.filter(item => {
        return item.menu.id === menu;
      });
    }
  }
}

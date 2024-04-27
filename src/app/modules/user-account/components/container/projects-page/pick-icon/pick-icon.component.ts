import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Icon {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-pick-icon',
  templateUrl: './pick-icon.component.html',
  styleUrls: ['./pick-icon.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PickIconComponent),
    multi: true,
  }]
})
export class PickIconComponent implements ControlValueAccessor {
  onChange(iconName: string) {};
  onTouched(isTouched: boolean) {};

  writeValue(iconName: string): void {
    const icon = this.icons.find(x=> x.name == iconName);
    if (icon) {
      this.selectIcon(icon);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }


  public icons: Icon[] = [
    {
      name: "flight",
      selected: false
    },
    {
      name: "emoji_events",
      selected: false
    },
    {
      name: "icecream",
      selected: false
    },
    {
      name: "favorite",
      selected: false
    },
    {
      name: "rocket_launch",
      selected: false
    },
    {
      name: "pets",
      selected: false
    },
    {
      name: "public",
      selected: false
    },
    {
      name: "diamond",
      selected: false
    },
    {
      name: "group",
      selected: false
    },
    {
      name: "account_balance",
      selected: false
    },
    {
      name: "monetization_on",
      selected: false
    },
    {
      name: "celebration",
      selected: false
    },
    {
      name: "palette",
      selected: false
    },
    {
      name: "shopping_cart",
      selected: false
    },
    {
      name: "work",
      selected: false
    },
    {
      name: "menu_book",
      selected: false
    },
    {
      name: "handyman",
      selected: false
    },
    {
      name: "medical_services",
      selected: false
    },
    {
      name: "home_work",
      selected: false
    },
    {
      name: "local_florist",
      selected: false
    },
    {
      name: "school",
      selected: false
    },
    {
      name: "music_note",
      selected: false
    },
    {
      name: "dry_cleaning",
      selected: false
    },
    {
      name: "directions_car",
      selected: false
    },
    
  ];

  private selectedIcon: Icon;

  selectIcon(icon: Icon) {
    this.icons.forEach(x=> x.selected = false);
    icon.selected = true;
    this.selectedIcon = icon;
    this.onChange(icon.name);
    this.onTouched(true);
  }
}


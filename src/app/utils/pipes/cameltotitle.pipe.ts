import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "camelToTitle" })

export class CamelToTitle implements PipeTransform {
    public transform(value: string): string {
        if (value)
            return value.charAt(0).toUpperCase() + value.slice(1);
        return value;
    }
} 
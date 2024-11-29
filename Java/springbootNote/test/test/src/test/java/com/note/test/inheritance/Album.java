package com.note.test.inheritance;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
public class Album extends Item{

    private String artist;

    public Album(String name, String price, String artist) {
        super(name, price);
        this.artist = artist;
    }

    @Override
    public String toString() {
        return "Album{" + "name='" + this.getName() + '\'' +
                ", price='" + this.getPrice() + '\'' +
                '}' +
                "artist='" + artist + '\'' +
                '}';
    }
}

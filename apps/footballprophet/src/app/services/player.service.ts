import { Injectable } from '@angular/core';
import { Player, Position } from '@footballprophet/domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Player[] = [
    {
      id: '1',
      name: 'Lionel Messi',
      dateOfBirth: new Date('1987-06-24'),
      position: Position.FW,
      nationality: 'Argentina',
      photoUrl: 'https://www.flashscore.com/res/image/data/d8SZZtZg-nNCjsra2.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Cristiano Ronaldo',
      dateOfBirth: new Date('1985-02-05'),
      position: Position.FW,
      nationality: 'Portugal',
      photoUrl: 'https://www.flashscore.com/res/image/data/QXkwuwHG-EJcn5Kai.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Kylian Mbappé',
      dateOfBirth: new Date('1998-12-20'),
      position: Position.FW,
      nationality: 'France',
      photoUrl: 'https://www.flashscore.com/res/image/data/C2kfb8dM-8QfA3Tpl.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      name: 'Mohamed Salah',
      dateOfBirth: new Date('1992-06-15'),
      position: Position.FW,
      nationality: 'Egypt',
      photoUrl: 'https://www.flashscore.com/res/image/data/rXrxPtZg-S6oLNQmH.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      name: 'Neymar',
      dateOfBirth: new Date('1992-02-05'),
      position: Position.FW,
      nationality: 'Brazil',
      photoUrl: 'https://www.flashscore.com/res/image/data/Y9iNhbe5-hxJXRX3n.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      name: 'Darwin Núñez',
      dateOfBirth: new Date('1996-01-01'),
      position: Position.FW,
      nationality: 'Uruguay',
      photoUrl: 'https://www.flashscore.com/res/image/data/2LHkh9jl-M1tW1Y2U.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  getPlayers(): Player[] {
    return this.players;
  }

  getPlayer(id: string): Player | undefined {
    console.log(this.players)
    return this.players.find(p => p.id === id);
  }

  addPlayer(player: Player): void {
    player.id = uuidv4();
    player.createdAt = new Date();
    player.updatedAt = new Date();

    this.players.push(player);
  }

  updatePlayer(player: Player): void {
    player.updatedAt = new Date();

    const index = this.players.findIndex(p => p.id === player.id);
    this.players[index] = player;
  }

  deletePlayer(id: string): void {
    this.players = this.players.filter(p => p.id !== id);
  }
}

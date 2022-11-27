import { Injectable } from '@angular/core';
import { Team } from '@footballprophet/domain';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  private teams: Team[] = [
    { 
      id: '1',
      name: 'Argentina',
      logoUrl: 'https://www.flashscore.com/res/image/data/xQCUe9zB-Ew8fJsrC.png',
      foundedIn: new Date(1893, 0, 1),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '2',
      name: 'Portugal',
      logoUrl: 'https://www.flashscore.com/res/image/data/IBvrXaZg-ny8ThRvl.png',
      foundedIn: new Date(1914, 0, 1),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: '3',
      name: 'France',
      logoUrl: 'https://www.flashscore.com/res/image/data/I5PqTkcM-EoQ0Krck.png',
      foundedIn: new Date(1904, 0, 1),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      name: 'Egypt',
      logoUrl: 'https://www.flashscore.com/res/image/data/SnO3j6HG-hCLG2iVH.png',
      foundedIn: new Date(1920, 0, 1),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      name: 'Brazil',
      logoUrl: 'https://www.flashscore.com/res/image/data/hCaVxehl-4GYKBvjG.png',
      foundedIn: new Date(1920, 0, 1),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      name: 'Uraguay',
      logoUrl: 'https://www.flashscore.com/res/image/data/ddzsJgf5-ldp78QTg.png',
      foundedIn: new Date(1900, 0, 1),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  getTeams(): Team[] {
    return this.teams;
  }

  getTeam(id: string): Team | undefined {
    return this.teams.find(t => t.id === id);
  }

  addTeam(team: Team): void {
    this.teams.push(team);
  }

  updateTeam(team: Team): void {
    const index = this.teams.findIndex(t => t.id === team.id);
    this.teams[index] = team;
  }

  deleteTeam(id: string): void {
    this.teams = this.teams.filter(t => t.id !== id);
  }
}

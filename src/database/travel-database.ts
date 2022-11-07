import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { Travel } from 'src/travels/travel.entity';

@Injectable()
export class TravelDatabase {
  private FILENAME = 'travels.json';

  public async getTravels(): Promise<Travel[]> {
    const travelInFile = await readFile(this.FILENAME, 'utf-8');
    const travels = JSON.parse(travelInFile);
    return travels;
  }

  public async saveTravel(travel: Travel) {
    let travels = await this.getTravels();
    if (!travels) {
      travels = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...travels, travel]));
  }

  public async saveTravels(travels: Travel[]) {
    await writeFile(this.FILENAME, JSON.stringify(travels));
  }
}

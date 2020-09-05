import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    // scale: false,
    responsive: true,
  };
  public barChartLabels: Label[] = [
    'Pregunta 1',
    'Pregunta 2',
    'Pregunta 4',
    'Pregunta 4',
  ];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Entrevistados' },
  ];

  constructor(
    private httpClient: HttpClient,
    public wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.escucharSockets();
  }

  getData() {
    this.httpClient.get('http://localhost:5000/encuesta').subscribe((data: any) => {
        console.log({ data });
        this.barChartData = data.encuesta;
        // this.lineChartData = data.grafica;
    });
  }

  escucharSockets() {
    this.wsService.listen('cambio-grafica').subscribe((data: any) => {
      console.log('sockets: ', { data });
      this.barChartData = data;
    });
  }
}

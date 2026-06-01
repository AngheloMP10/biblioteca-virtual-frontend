import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardService } from '../../../core/services/dashboard';

import { DashboardMetricas } from '../../../core/models/dashboard-metricas';
import { DashboardLibro } from '../../../core/models/dashboard-libro';
import { DashboardGenero } from '../../../core/models/dashboard-genero';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  loading = true;

  metricas!: DashboardMetricas;

  fechaInicio = '';
  fechaFin = '';

  librosMasPrestados: DashboardLibro[] = [];

  generosMasPopulares: DashboardGenero[] = [];

  // Gráfico de barras
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Préstamos',
        data: [],
      },
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Gráfico circular
  pieChartType: ChartType = 'pie';

  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    this.loading = true;

    this.dashboardService.getDashboard().subscribe({
      next: (response) => {
        this.metricas = response.metricas;

        this.librosMasPrestados = response.librosMasPrestados;

        this.generosMasPopulares = response.generosMasPopulares;

        this.actualizarGraficos();

        this.loading = false;
      },

      error: (err) => {
        console.error('Error cargando dashboard', err);
        this.loading = false;
      },
    });
  }

  filtrarDashboard(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      return;
    }

    this.loading = true;

    this.dashboardService
      .getDashboardPorFecha(this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (response) => {
          this.metricas = response.metricas;

          this.librosMasPrestados = response.librosMasPrestados;

          this.generosMasPopulares = response.generosMasPopulares;

          this.actualizarGraficos();

          this.loading = false;
        },

        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  exportarExcel(): void {
    this.dashboardService.exportarExcel().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;
        a.download = 'dashboard.xlsx';

        a.click();

        window.URL.revokeObjectURL(url);
      },

      error: (err) => {
        console.error('Error exportando Excel', err);
      },
    });
  }

  limpiarFiltro(): void {
    this.fechaInicio = '';
    this.fechaFin = '';

    this.cargarDashboard();
  }

  private actualizarGraficos(): void {
    // Libros más prestados
    this.barChartData = {
      labels: this.librosMasPrestados.map((l) => l.titulo),
      datasets: [
        {
          label: 'Préstamos',
          data: this.librosMasPrestados.map((l) => l.cantidad),
        },
      ],
    };

    // Géneros más populares
    this.pieChartData = {
      labels: this.generosMasPopulares.map((g) => g.genero),
      datasets: [
        {
          data: this.generosMasPopulares.map((g) => g.cantidad),
        },
      ],
    };
  }
}

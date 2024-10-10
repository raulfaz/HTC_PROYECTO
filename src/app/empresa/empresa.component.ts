import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SERVICIOS } from '../datos/servicios';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule, MatStepperModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

  servicios = SERVICIOS

  isLinear = false;
  isMobile = false;

  timelineData = [
    {
      icon: 'business_center', // Representa la creación de la empresa
      year: '2015',
      title: 'Constitución de HINGELECTC CIA. LTDA.',
      description: 'Se inició formalmente nuestras operaciones en Santo Domingo de los Tsáchilas, estableciendo la empresa con un enfoque claro en la provisión de servicios de redes eléctricas. Desde el inicio, nos comprometimos a ofrecer soluciones eficientes y de calidad a nuestros clientes, estableciendo una base sólida para el crecimiento futuro.'
    },
    {
      icon: 'domain', // Representa la expansión y crecimiento
      year: '2016',
      title: 'Crecimiento y Proyectos Estratégicos',
      description: 'Durante este periodo, logramos un notable crecimiento al desarrollar proyectos estratégicos en colaboración con importantes empresas eléctricas del país. Esta etapa no solo marcó la expansión de nuestra cartera de clientes, sino que también nos permitió incursionar en nuevos mercados en Ecuador, diversificando nuestras oportunidades de negocio.'
    },
    {
      icon: 'bolt', // Relacionado con energía y electricidad
      year: '2020',
      title: 'Nuevas Líneas de Negocio',
      description: 'En respuesta a las demandas del mercado, diversificamos nuestras operaciones para incluir obras civiles y proyectos de infraestructura. Esta expansión nos permitió ofrecer soluciones integrales que abarcan tanto el sector eléctrico como el de la construcción, fortaleciendo nuestra posición competitiva y ampliando nuestro alcance en el mercado.'
    },
    {
      icon: 'groups', // Simboliza el equipo y los valores
      year: '2022',
      title: 'Fortalecimiento del Equipo y Alianzas',
      description: 'A lo largo de este año, nos enfocamos en la incorporación de talento especializado, lo que fortaleció nuestro equipo y nuestras capacidades operativas. Además, establecimos alianzas estratégicas con otras empresas del sector, lo que nos permitió optimizar recursos y expandir nuestras capacidades de servicio.'
    },
    {
      icon: 'public', // Representa sostenibilidad y expansión
      year: '2023',
      title: 'Compromiso con la Sostenibilidad',
      description: 'Conscientes de nuestra responsabilidad social, implementamos prácticas sostenibles en nuestros proyectos. Esta iniciativa no solo responde a un compromiso ético con el medio ambiente, sino que también nos posiciona como un referente en el sector eléctrico, destacando por la calidad y sostenibilidad de nuestras soluciones.'
    }
  ];


  constructor(private breakpointObserver: BreakpointObserver) {
    // Detectar si el dispositivo es pequeño para cambiar la orientación
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  // cards con las áreas y explicaciones para SOPORTE TÉCNICO
  cards = [
    {
      icon: 'engineering',
      title: 'Calidad',
      content: 'Nos comprometemos a entregar soluciones eléctricas con altos estándares de calidad, asegurando la confiabilidad y eficiencia en cada proyecto.',
    },
    {
      icon: 'support_agent',
      title: 'Atención Personalizada',
      content: 'Ofrecemos un servicio de atención al cliente especializado, orientado a cubrir todas tus necesidades, garantizando soporte en cada etapa del proyecto.',
    },
    {
      icon: 'bolt',
      title: 'Innovación',
      content: 'Nos mantenemos a la vanguardia tecnológica, implementando soluciones innovadoras y eficientes para mejorar el rendimiento energético de nuestros clientes.',
    }
  ];



  // Array 'services' actualizado con las áreas de SOPORTE TÉCNICO
  services = [
    {
      title: 'Soporte Eléctrico',
      description: 'Brindamos asistencia técnica especializada para resolver problemas eléctricos, asegurando un servicio rápido y eficiente para mantener tus instalaciones en óptimas condiciones.'
    },
    {
      title: 'Atención Personalizada',
      description: 'Ofrecemos un servicio de atención personalizada para garantizar que todas tus consultas y problemas técnicos sean resueltos a la mayor brevedad posible.'
    },
    {
      title: 'Mantenimiento Preventivo',
      description: 'Realizamos mantenimiento preventivo en tus sistemas eléctricos, con el fin de evitar fallos y asegurar un rendimiento continuo y seguro de tu infraestructura.'
    },
    {
      title: 'Innovación y Actualización',
      description: 'Nos mantenemos actualizados con las últimas tecnologías, implementando soluciones innovadoras y eficientes para mejorar la capacidad de tu sistema eléctrico.'
    }
  ];


}

<template>
    <div class="row">
      <div class="col-md-12">
      <card>
        <div slot="header">
          <h4 class="card-title">Agregar nuevo dispositivo</h4>
        </div>

        <div class="row">
          <div class="col-4">
            <base-input
              label="Nombre de dispositivo"
              type="text"
              placeholder="Ex: Home, Office..."
              
            >
            </base-input>
          </div>

          <div class="col-4">
            <base-input
              label="Id de dispositivo"
              type="text"
              placeholder="Ex: 7777-8888"
            >
            </base-input>
          </div>

          <div class="col-4">
            <slot name="label">
                <label> Plantilla </label>
            </slot>
            <el-select
                v-model="selectedIndexTemplate"
                placeholder="Eliga plantilla"
                class="select-info"
                style="width:100%"
            >
                <el-option
                    v-for="(template, index) in templates"
                    :key="template"
                    :value="template"
                    :label="template"
                ></el-option>
            </el-select>
        </div>

         
          
        </div>

        <div class="row pull-right">
          <div class="col-12">
            <base-button
              @click="createNewDevice()"
              type="info"
              class="mb-3"
              size="lg"
              >Agregar</base-button
            >
          </div>
        </div>
      </card>
    </div>
  
      <div class="col-md-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">Lista de dispositivos</h4>
  
          <el-table
            header-cell-class-name="table-transparent"
            header-row-class-name="table-transparent"
            row-class-name="table-transparent"
            :data="tableData"
          >
            <!-- Columnas de la tabla -->
            <el-table-column
              min-width="200"
              sortable
              label="Nombre de dispositivo"
              prop="name"
            ></el-table-column>
  
            <el-table-column
              min-width="200"
              sortable
              label="Id dispositivo"
              prop="did"
            ></el-table-column>
  
            <el-table-column
              min-width="200"
              sortable
              label="Plantilla"
              prop="template"
            ></el-table-column>
  
            <el-table-column min-width="80" header-align="left" label="Estado">
              <!-- Usar v-for para crear un interruptor para cada fila -->
              <template v-slot:default="{ row }">
                <el-tooltip content="Database Saver">
                  <base-switch
                    v-model="row.switchValue"
                    :on-text="'On'"
                    :off-text="'Off'"
                    type="Info"
                  ></base-switch>
                </el-tooltip>
              </template>
            </el-table-column>
  
            <el-table-column min-width="80" header-align="left" label="Acciones">
                <el-tooltip content="Delete"
                  :open-delay="300"
                  placement="top">
                    <base-button type="danger" size="sm" icon>
                        <i class="tim-icons icon-simple-remove"></i>
                        </base-button>
                </el-tooltip>
            </el-table-column>
          </el-table>
        </card>
      </div>
    </div>
  </template>
  
  <script>
  import { Table, TableColumn } from 'element-ui';
  import Switch from '@/components/BaseSwitch/';
  import { Select, Option } from "element-ui";
  
  export default {
    name: 'regular',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Switch.name]: Switch,
      [Option.name]: Option,
    [Select.name]: Select   
    },
  
    data() {
      return {
        selectedIndexTemplate: '', // El índice de la plantilla seleccionada
        templates: ['plantilla_1', 'plantilla_2', 'plantilla_3'], // Opciones de plantillas
        tableData: [
          // Datos de ejemplo
          {
            id: 1,
            name: 'Sensor Bosa',
            did: '13245t35yte4rd',
            template: 'plantilla_general',
            switchValue: false
          },
          {
            id: 2,
            name: 'Sensor Usme',
            did: '13245t35yte4rd',
            template: 'plantilla_general',
            switchValue: false
          },
          {
            id: 3,
            name: 'Sensor Chapinero',
            did: '13245t35y2e4r3',
            template: 'plantilla_general',
            switchValue: false
          },
          {
            id: 4,
            name: 'Sensor Usaquen',
            did: '13243t36yre4rd',
            template: 'plantilla_general',
            switchValue: false
          },
          {
            id: 5,
            name: 'Sensor Salitre',
            did: '13243r34yte4rd',
            template: 'plantilla_general',
            switchValue: false
          }
        ]
      };
    },
  };
  </script>
  
  <style>
  .table-transparent {
    background-color: transparent !important;
  }

  .bootstrap-switch {
  /* Estilos base del interruptor */
}

.bootstrap-switch.bootstrap-switch-on {
  /* Estilos cuando el interruptor está encendido */
  background-color: #1d8cf8; /* Cambiar color de fondo cuando está encendido */
}

.bootstrap-switch.bootstrap-switch-off {
  /* Estilos cuando el interruptor está apagado */
  background-color: #344675; /* Cambiar color de fondo cuando está apagado */
}
  </style>
  
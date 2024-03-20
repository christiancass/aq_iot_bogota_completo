<template>
    <div class="row">
        <div class="col-md-12">
            <card>
                <div slot="header">
                    <h4 class="card-title">Agregar nueva regla</h4>
                </div>

                <div class="row">

                    <div class="col-3">
                        <slot name="label">
                            <label> Variable </label>
                        </slot>
                        <el-select
                            v-model="selectedIndexTemplate"
                            placeholder="Selecionar variable"
                            class="select-primary"
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

                    <div class="col-3">
                        <slot name="label">
                            <label> Condición </label>
                        </slot>
                        <el-select
                            v-model="selectedIndexTemplate"
                            placeholder="Seleccionar condición"
                            class="select-primary"
                            style="width:100%"
                        >
                            <el-option class="text-dark" value="=" label="="></el-option>
                            <el-option class="text-dark" value=">" label=">"></el-option>
                            <el-option class="text-dark" value=">=" label=">="></el-option>
                            <el-option class="text-dark" value="<" label="<"></el-option>
                            <el-option class="text-dark" value="<=" label="<="></el-option>
                            <el-option class="text-dark" value="!=" label="!="></el-option>
                        </el-select>
                    </div> 

                    <div class="col-3">
                        <base-input
                            label="Valor"
                            type="text"
                            placeholder="Ex: 30, 100..."  
                        >
                        </base-input>
                    </div>

                    <div class="col-3">
                        <base-input
                            label="Tiempo de validación"
                            type="text"
                            placeholder="Ex: 1000, 2000"
                        >
                        </base-input>
                    </div>

                </div>

                <div class="row pull-right">
                    <div class="col-12">
                        <base-button
                            @click="createNewDevice()"
                            type="info"
                            class="mb-3"
                            size="lg"
                            >Agregar</base-button>
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
              min-width="80"
              label="Variable"
              prop="Varname"
            ></el-table-column>
  
            <el-table-column
              min-width="80"
              label="Id de variable"
              prop="Varid"
            ></el-table-column>
  
            <el-table-column
              min-width="80"
              label="Condición"
              prop="condition"
            ></el-table-column>

            <el-table-column
              min-width="80"
              label="Valor"
              prop="value"
            ></el-table-column>

            <el-table-column
              min-width="80"
              label="Muestreo (S)"
              prop="sample"
            ></el-table-column>
  
            <el-table-column min-width="40" header-align="left" label="Estado">
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
  
            <el-table-column min-width="40" header-align="left" label="Acciones">
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
            Varname: 'Temperatura',
            Varid: '13245t35yte4rd',
            condition: '>=',
            value:"30",    
            sample:"10",
            switchValue: false
          },
          {
            id: 2,
            Varname: 'Humedad',
            Varid: '13245t35yte4rd',
            condition: '!=',
            value:"50", 
            sample:"3",
            switchValue: false
          },
          {
            id: 3,
            Varname: 'Presión',
            Varid: '13245t35y2e4r3',
            condition: '=',
            value:"500", 
            sample:"100",
            switchValue: false
          },
          {
            id: 4,
            Varname: 'PM10',
            Varid: '13243t36yre4rd',
            condition: '<',
            value:"100", 
            sample:"5",
            switchValue: false
          },
          {
            id: 5,
            Varname: 'PM2.5',
            Varid: '13243r34yte4rd',
            condition: '<=',
            value:"35", 
            sample:"2",
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
  
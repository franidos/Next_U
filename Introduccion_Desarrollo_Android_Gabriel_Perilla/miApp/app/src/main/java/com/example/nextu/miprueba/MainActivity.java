package com.example.nextu.miprueba;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.example.nextu.milibreria.MiClase;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Se trae los textos de la libreria
        Log.i("MiTexto1", MiClase.bienvenida);
        Log.i("MiTexto2", MiClase.conceptos);
        Log.i("MiTexto3", MiClase.material);
        Log.i("MiTexto4", MiClase.desAppAvan);


    }
}

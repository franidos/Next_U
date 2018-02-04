package com.nextu.agencia;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

public class GaleriaActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_galeria);
        Log.wtf("Ciclo de vida GAleria", "onCreate");

        //Recibe datos
        Bundle datos = this.getIntent().getExtras();
        String variable_int = datos.getString("nombreuser");
        String variable_string = datos.getString("pass");
    }
    @Override
    protected void onStart() {
        super.onStart();
        Log.wtf("Ciclo de vida GAleria", "onStart");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.wtf("Ciclo de vida GAleria", "onRestart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.wtf("Ciclo de vida GAleria", "onResume");
    }
}
